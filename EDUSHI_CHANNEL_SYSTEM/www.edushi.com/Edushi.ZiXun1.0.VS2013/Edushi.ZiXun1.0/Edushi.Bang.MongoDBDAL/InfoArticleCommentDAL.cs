�}�� r %
  ��\#4�6��a	���#_���}�����2�g1��@��wT��X ���t3�dCu��^>�n����F�t{��G�:fF��9a�(�B'Ajj������ϣ���j=�T�v��^�i�s����Ǖ���2гv7��RLl�ġ��ͨ^����S Y��k5JJ�3�2��J�WoOPA,��'�|��07��i����L� ���VU ��$@�� ��9V��L�X�cٝ�fo�z��(�8��=��C��l8V����fL;G6%�w������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l(ʹ��<�rA� �uɍ��(�7��K0[�����O�=��&΍��3i�)�S�7֘�UT���F6���"�1OmN���Om����7	�a�P�r����o��k^0h�f�cu�ԏ��k5��t��JZ�Y�������Iӏ��.�>p5��8���3���������U"���8xlހ4m \�
�Ƥ�R"Q�`����\7#=	�{�d8����ag��э=x-N&}��+;����Rڊy��3<��m�PϤ�^=��o1�{y>7�';3���_^�(�M#��-/+�I���j?na�7�0������4�"<�Q���M���F��|X��`N��2�p'Ek��7t^�R5ʀ$�ܠ0�Z6�qÔ��3͗�X�T�޹�.��=��{��e�����(73�g���*j���g�h'	��G%kn��%E��o V��;�u7������@�����0��#����R۸���M�Zp!�Ng�Y�l��l%?4���AaZ?�q��0(܆ٱ�D��kz�޵cDu�>���rH��o;�ȯ̕��,��)TRm��5e��(1�.�ձ��ĉ�#�V�ަ.�C��%���iV�5��-��X0H��T�҇ȮĆ���(�̚u��YuFsD��s�C���]�D������;	��:��it�S��Nb�^X�_#ӴL2x)TR��:�|)�V�[oԁƴ��3�؇6����"��G�T��O����
�@z_m�B53ҩ��v��~�?�<3��!�N�D��}lZ�6�j���F9=��dL�sm1o�|�Wn���k1�ͬɚ2��y���^#�f��xkz���V� ��s."�>&9�"����D�pl	�h5
u�����9'�,�r ��#�B`�A�[�>����TC#�|8�Ԋs}ZȽ���݈ᵔ� 䨩D�:��K"�"�طYB���ڹ�~�N��'�L�Gx�e��������o�-�>m���Ң�;��I'xr�jery.And(Query.EQ("IA_ID", IA_ID));
            #endregion

            var p = _mongoCollection.FindAs<InfoArticleCommentModel>(query);
            List<InfoArticleCommentModel> list = p.SetSortOrder(sort).SetSkip((iCurrPageIndex - 1) * iPageSize).SetLimit(iPageSize).ToList();
            totalCount = (Int32)p.Count();
            return list;
        }
        #endregion
    }
}
