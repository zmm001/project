�}�� r �  �HNj.��a	��7��_�����>v8��F�o�]gu��M��3�t��ڒh����M�⣫f���-�b7z��)���av��Șp-?OU�9�p���'\Dq�<ϣ�����<j��E:���p��f�~�b�,;���_�e$����=����N�!�S"�c��O����L�y��O�l�T!���K��E4�����	(+�AAw`X��19	=;��H��u&����K�<�=���K�/='~r�;yQo�i�W�Dz�j��Z���"-��t �x�e>�Ʈ�]� W;�F�=*�AJqxk�c~O+����J�YS��p�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ice().List<Novel_BookRack>(br => br.NB_ID == bookId && br.UI_ID == userId).Count > 0;
        }

        /// <summary>
        /// 返回用户的书架数量
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int GetBookrackListCount(int userId)
        {
            return new MongoDbService().List<Novel_BookRack>(nb => nb.UI_ID == userId).Count;
        }
    }
}
