�}�� r �!  ݣ�p��e��a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�M��8�� ��i/���9Xe��D��
�j�7����-
��8S�,�X�k��2m}v7܌3bC��"����A'{��E��k�#fkm�!�s�T��|�}'���B[���8�"#\=x3٧��)���X1�<����3qC����o�A2���r䋟��=�)p/R'6�R��9̏�4
�������L���>40'V�-�j�ͣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l(ʹ��^r�6r�"��׈�R���7j-�~]yQ��蛓ۿˤ=` ̝�����v*91!�#ٳu����� ����=EMX�����ߋ􂰊���SO:6�[#X�n6oa0���ث� EL��i����y��J�ԋΪ�z���Z��[��G5��8���9�������D��U"���2Uw��"z|\
���4�k_�VE����V296<G�}�!2����B`��ێ,3#~ .Z:��{#����t��v����W~��#���5s��NW!t�/l0 =�&*W��1�TV�o�`0��>K$�_�$��Pz@�t��Êȭ�~w�Q�k���`�8�Y�Et�@��l[/ ��q�=j %��uj�c7��y���0�yO�>�۶�vǅ�0�H�ޔ�-����p��r �����(73�g���*j���g�h'	��G%kn��%E��o V��;�u7������@�����0��#����R۸���M�Zp!�Fg�Y�l��)
            {
                return new List<PicRelationRecommendModel>();
            }
            QueryDocument query = new QueryDocument();
            query.Add("PRR_PA_ID", PA_ID);

            return _mongoCollection.FindAs<PicRelationRecommendModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
