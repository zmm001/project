�}� r R  �L�oЗ��a	��� ��^���}ꬉ�<�����F��22yVKlWnZB����<V���xġ�w���k�������zk<!�P�-Q�ȤV�@��6��D�0�T�j�<M��k��9?�A�!nGk�XX��Z�����k�o~�SohjO��Y	�D+��}�Im�ס�L��~�D	g	�_�6�]l�h���Yz5ɂ�����UFrYpmqR���<잶]����&�Lƚ��,��l�С�V���!�����<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�*��\tL��=�|H�ۓ�;�����+>ƚ��9�Xg˛L8�³N�{:f��q�y�w�s#ck>Q��v���;Z��+#R����>):33w�h�H���r@��uT,]�E)l�P+՘���0��*�	�a��44�a��Џ�G�!�`cWg�R����]�!z]��S ����_(�kch�N�fH(�>E�ݥ4���ⶁCf�QBed�%����U��c\��YH烌!h��H�����6�fNqp����8B�ؑ C<��h�UC���>nA%@kaWe�2|�2E�W���/�
�nW�U�%�`�5S� 9U��((-�T�}UG������^RX�f�*A/9�@29}�՟�����ɸ���C����+����mϦ��oI{bAY\[O�ѳ�-�L�i8=UA�a� u!��5��B���!y���/b&e�o�K��`�j81S<�d
�R�2��#h�����b1�C���Ts�Rȍj��U�
֮x�|)>.ECS_DBConnectString).GetHeroList(EdushiPager.PageSize, CurrentPage, out  nRecordCount);
            EdushiPager.RecordCount = nRecordCount;
            GVHero.DataBind();
		}
        private int CurrentPage
        {
            get
            {
                return WebHelper.GetQueryString("page", 1);
            }
        }
	}
}
