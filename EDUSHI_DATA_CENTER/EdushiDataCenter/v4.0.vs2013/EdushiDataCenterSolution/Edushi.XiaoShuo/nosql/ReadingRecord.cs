�}�� r �  ��K_����a	��0�ˀ>��}��eZ���� L��m$�]2Kq�G�F��6��k&f�Ce� !sc���N��7O6�tk�J%<���\*:LL\-�fde^�2�7���,����L�ݚl��U��|����ZO&h�k��;�C��H�o�r�x5KJe2f���R?Ӣj�6�	57[.��w�)�tz���Y���I�Ŷ�rS��7��������z��X�Bw`ZH�I2�O)蹭�����}��K��;����a(DYأ�����84=_;�v�"����~����;}T��Zq���%`X�H�K Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�MongoDbService().List<Novel_ReadingRecord>(rr => rr.NB_ID == bookId && rr.UI_ID == userId).Count > 0;
        }

        /// <summary>
        /// 返回用户的阅读记录数量
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int GetReadRecordListCount(int userId)
        {
            return new MongoDbService().List<Novel_ReadingRecord>(rr => rr.UI_ID == userId).Count;
        }
    }
}
